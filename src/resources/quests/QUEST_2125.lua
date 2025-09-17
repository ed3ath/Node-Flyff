QUEST_2125 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_001384',
	character = 'MaDa_Lurif',
	end_character = 'MaDa_Lurif',
	start_requirements = {
		min_level = 60,
		max_level = 129,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 2709462,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_BIGFOOTHEART', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001385',
			'IDS_PROPQUEST_REQUESTBOX_INC_001386',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001387',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001388',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001389',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001390',
		},
	}
}
