QUEST_2099 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_001094',
	character = 'MaHa_Jano',
	end_character = 'MaHa_Jano',
	start_requirements = {
		min_level = 105,
		max_level = 129,
		job = { 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 1672126053,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_BIGTOENAIL', quantity = 10, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001095',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001096',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001097',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001098',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001099',
		},
	}
}
