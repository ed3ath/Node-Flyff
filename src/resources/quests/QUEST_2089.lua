QUEST_2089 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000980',
	character = 'MaHa_Jano',
	end_character = 'MaHa_Jano',
	start_requirements = {
		min_level = 114,
		max_level = 129,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR' },
		previous_quest = '',
	},
	rewards = {
		gold = 1700000,
		exp = 1250826955,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_FLOWER', quantity = 70, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000981',
			'IDS_PROPQUEST_REQUESTBOX_INC_000982',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000983',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000984',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000985',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000986',
		},
	}
}
