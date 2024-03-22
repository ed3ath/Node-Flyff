QUEST_2090 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000992',
	character = 'MaHa_Jano',
	end_character = 'MaHa_Jano',
	start_requirements = {
		min_level = 117,
		max_level = 129,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR' },
		previous_quest = '',
	},
	rewards = {
		gold = 2200000,
		exp = 1672126053,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_DOGTOOTH', quantity = 70, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000993',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000994',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000995',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000996',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000997',
		},
	}
}
