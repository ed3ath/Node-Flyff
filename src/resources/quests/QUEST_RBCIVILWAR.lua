QUEST_RBCIVILWAR = {
	title = 'IDS_PROPQUEST_INC_001163',
	character = 'MaFl_Luda',
	end_character = 'MaFl_Luda',
	start_requirements = {
		min_level = 60,
		max_level = 80,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = 'QUEST_ARCTHIEF',
	},
	rewards = {
		gold = 0,
		exp = 2709462,
	},
	end_conditions = {
		patrols = {
			{ map = 'WI_WORLD_MADRIGAL', left = 5280, top = 3413, right = 5324, bottom = 3377 },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001164',
			'IDS_PROPQUEST_INC_001165',
			'IDS_PROPQUEST_INC_001166',
			'IDS_PROPQUEST_INC_001167',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001168',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001169',
		},
		completed = {
			'IDS_PROPQUEST_INC_001170',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001171',
		},
	}
}
